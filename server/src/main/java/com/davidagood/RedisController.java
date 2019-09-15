package com.davidagood;

import com.davidagood.redis.CommandResult;
import com.davidagood.redis.RedisForJava;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Component
@RestController
@RequestMapping("/api")
@Slf4j
public class RedisController {

    private final RedisForJava redis;

    @Autowired
    public RedisController(RedisForJava redis) {
        this.redis = redis;
    }

    @GetMapping("/hash/{key}/field/{field}")
    public String getHashField(@PathVariable String key, @PathVariable String field) {
        log.info("Started - Getting hash field for key={}, field={}", key, field);
        String hashField = redis.getHashField(key, field);
        log.info("Completed - Getting hash field for key={}, field={}", key, field);
        return hashField;
    }

    @GetMapping("/hash/{key}")
    public Map<String, String> getHashFields(@PathVariable String key) {
        log.info("Started - Getting hash fields for key={}", key);
        Map<String, String> hashFields = redis.getHashFields(key);
        log.info("Completed - Getting hash field for key={}", key);
        return hashFields;
    }

    @PostMapping("/hash/{key}/field/{field}/value/{value}")
    public CommandResult setHashField(@PathVariable String key, @PathVariable String field, @PathVariable String value) {
        log.info("Started - Setting hash field for key={}, field={}, value={}", key, field, value);
        CommandResult commandResult = redis.setHashField(key, field, value);
        log.info("Completed - Setting hash field for key={}, field={}, value={}", key, field, value);
        return commandResult;
    }

    @DeleteMapping("/hash/{key}/field/{field}")
    public CommandResult deleteHashField(@PathVariable String key, @PathVariable String field) {
        log.info("Started - Deleting hash field for key={}, field={}", key, field);
        CommandResult commandResult = redis.deleteHashField(key, field);
        log.info("Completed - Deleting hash field for key={}, field={}", key, field);
        return commandResult;
    }

}
