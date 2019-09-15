import * as React from "react";
import { FetchResponse, doFetch, FetchRequest } from "./fetchUtil";
import { CommandContext } from "./App";
import StyleContext from "./StyleContext";
import { RedisCommand, RedisCommandType, CommandResult } from "./types";

interface CommandRunnerProps {
  command: RedisCommand;
}

interface RedisCommandParameter {
  key: string;
  name: string;
}

interface RedisCommandParameterKeyValue {
  key: string;
  value: string;
}

interface RedisCommandDescriptor {
  type: RedisCommandType;
  parameters: RedisCommandParameter[];
  urlBuilder: (...args: any[]) => string;
  fetchOptions?: object;
}

function withEmptyValue(obj: object) {
  return { ...obj, value: "" };
}

export const RedisCommandDescriptor: {
  [key in RedisCommand]: RedisCommandDescriptor;
} = {
  [RedisCommand.GET_HASH_FIELD]: {
    type: RedisCommandType.READ,
    parameters: [{ key: "key", name: "Key" }, { key: "field", name: "Field" }],
    urlBuilder: ({ key, field }: { key: string; field: string }) =>
      `/api/hash/${key}/field/${field}`
  },
  [RedisCommand.GET_HASH_FIELDS]: {
    type: RedisCommandType.READ,
    parameters: [{ key: "key", name: "Key" }],
    urlBuilder: ({ key }: { key: string }) => `/api/hash/${key}`
  },
  [RedisCommand.SET_HASH_FIELD]: {
    type: RedisCommandType.WRITE,
    parameters: [
      { key: "key", name: "Key" },
      { key: "field", name: "Field" },
      { key: "value", name: "Value" }
    ],
    urlBuilder: ({
      key,
      field,
      value
    }: {
      key: string;
      field: string;
      value: string;
    }) => `/api/hash/${key}/field/${field}/value/${value}`,
    fetchOptions: { method: "POST" }
  },
  [RedisCommand.DELETE_HASH_FIELD]: {
    type: RedisCommandType.WRITE,
    parameters: [{ key: "key", name: "Key" }, { key: "field", name: "Field" }],
    urlBuilder: ({ key, field }: { key: string; field: string }) =>
      `/api/hash/${key}/field/${field}`,
    fetchOptions: { method: "DELETE" }
  }
};

interface RedisCommandParameterValidationResult {
  key: string;
  message: string;
}

function validateParameters(
  commandParameters: RedisCommandParameterKeyValue[]
): string[] {
  return commandParameters.reduce(
    (acc, curr) =>
      curr.value
        ? acc
        : acc.concat(`Please provide a value for parameter [${curr.key}]`),
    [] as string[]
  );
}

function CommandRunner({ command }: CommandRunnerProps) {
  const commandDescriptor = RedisCommandDescriptor[command];

  const [fetchData, setFetchData] = React.useState<any>(null);
  const [fetchError, setFetchError] = React.useState<any>(null);
  const [isFetching, setIsFetching] = React.useState(false);
  const [commandParameters, setCommandParameters] = React.useState<
    RedisCommandParameterKeyValue[]
  >(commandDescriptor.parameters.map(
    withEmptyValue
  ) as RedisCommandParameterKeyValue[]);

  const { dispatch } = React.useContext(CommandContext);
  const { theme, util } = React.useContext(StyleContext);

  function addCommandParameter(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const updatedCommandParameters = commandParameters.map(commandParameter => {
      if (commandParameter.key === name) {
        return { key: name, value };
      }
      return commandParameter;
    });
    setCommandParameters(updatedCommandParameters);
  }

  function handleRunCommand(e: React.FormEvent<HTMLFormElement>) {
    fetchWrapper();
    e.preventDefault();
  }

  const fetchWrapper = async () => {
    const validationErrors = validateParameters(commandParameters);
    if (validationErrors.length) {
      setFetchError(validationErrors.join("; "));
      return;
    }
    setFetchError("");
    setFetchData("");
    setIsFetching(true);
    const fetchRequest: FetchRequest = {
      url: commandDescriptor.urlBuilder(
        commandParameters.reduce(
          (acc, curr) => Object.assign(acc, { [curr.key]: curr.value }),
          {}
        )
      ),
      options: commandDescriptor.fetchOptions
    };

    const { data, error }: FetchResponse<any> = await doFetch<any>(
      fetchRequest
    );

    if (error) {
      setFetchError(error.message || error);
    } else {
      setFetchData(data);
    }
    setIsFetching(false);
  };

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "1rem",
          padding: "1rem"
        }}
      >
        <div>
          <h4
            style={{
              color: `${theme.dark.color.text.secondary}`,
              margin: "1rem"
            }}
          >
            {command}
          </h4>
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                ...util.unstyledButton,
                backgroundColor: `${theme.dark.color.background.secondary}`,
                color: `${theme.dark.color.text.light}`
              }}
              onClick={() =>
                dispatch({ type: "removeCommand", payload: command })
              }
            >
              <h6>Remove</h6>
            </button>
          </div>
        </div>

        <form onSubmit={handleRunCommand}>
          {commandDescriptor.parameters.map(parameter => (
            <div
              style={{
                margin: "0.5rem"
              }}
              key={parameter.key}
            >
              <label
                htmlFor={`command-parameter-${parameter.key}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
                  {parameter.name}
                </span>
                <input
                  id={`command-parameter-${parameter.key}`}
                  name={parameter.key}
                  type="text"
                  value={
                    commandParameters.find(
                      param => param.key === parameter.key
                    )!.value
                  }
                  onChange={addCommandParameter}
                />
              </label>
            </div>
          ))}
          <div style={{ marginTop: "0.1rem", textAlign: "center" }}>
            <input
              style={{
                ...util.unstyledButton,
                backgroundColor: `${theme.dark.color.background.secondary}`,
                color: `${theme.dark.color.text.light}`,
                fontWeight: "bold",
                fontSize: "1.1rem"
              }}
              type="submit"
              value="Go"
            />
          </div>
        </form>
      </div>
      <ConditionalResultsContainer shouldRender={isFetching}>
        Loading...
      </ConditionalResultsContainer>
      <ConditionalResultsContainer shouldRender={fetchData}>
        {fetchData && commandDescriptor.type === RedisCommandType.WRITE
          ? `${(fetchData as CommandResult).resultDescription}? ${
              (fetchData as CommandResult).result
            }`
          : JSON.stringify(fetchData)}
      </ConditionalResultsContainer>
      <ConditionalResultsContainer shouldRender={fetchError}>
        Error: {JSON.stringify(fetchError)}
      </ConditionalResultsContainer>
    </section>
  );
}

interface ConditionalResultsContainerProps {
  shouldRender: boolean;
  children: React.ReactNode;
}

function ConditionalResultsContainer({
  shouldRender,
  children
}: ConditionalResultsContainerProps) {
  return shouldRender ? (
    <div
      style={{
        textAlign: "center",
        margin: "1rem",
        overflowWrap: "break-word",
        maxHeight: "15vh",
        overflow: "auto"
      }}
    >
      {children}
    </div>
  ) : null;
}

export default CommandRunner;
