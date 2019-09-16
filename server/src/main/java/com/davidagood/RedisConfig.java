package com.davidagood;

import com.davidagood.redis.JedisWrapper;
import com.davidagood.redis.RedisForJava;
import com.davidagood.redis.RedisForJavaFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.Jedis;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Configuration
public class RedisConfig {

    private static final String ENV_REDIS_HOST = "REDIS_HOST";
    private static final String ENV_REDIS_PORT = "REDIS_PORT";
    private static final String ENV_REDIS_PORT_DEFAULT = "6379";

    @Bean
    public RedisForJava redisForJava() {
        Jedis jedis = createJedis();
        failIfNotConnectedToRedis(jedis);
        return RedisForJavaFactory.newRedisClient(new JedisWrapper(jedis));
    }

    private Jedis createJedis() {
        String host = getEnv(ENV_REDIS_HOST, null);
        int port = Integer.parseInt(getEnv(ENV_REDIS_PORT, ENV_REDIS_PORT_DEFAULT));
        return nonNull(host) ? new Jedis(host, port) : new Jedis();
    }

    private String getEnv(String property, String defaultValue) {
        String value = System.getenv(property);
        return isNull(value) || value.equals("") ? defaultValue : value;
    }

    private void failIfNotConnectedToRedis(Jedis jedis) {
        String message = "testing-redis-connection";
        String messageEcho = jedis.echo(message);
        if (!messageEcho.equals(message)) {
            throw new RuntimeException("Could not connect to local Redis server. Make sure you have" +
                    " a Redis server running locally with default settings: port 6379 and no password)");
        }
    }

}
