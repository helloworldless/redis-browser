package com.davidagood;

import com.davidagood.redis.JedisWrapper;
import com.davidagood.redis.RedisForJava;
import com.davidagood.redis.RedisForJavaFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.Jedis;

@Configuration
public class RedisConfig {

    @Bean
    public RedisForJava redisForJava() {
        return RedisForJavaFactory.newRedisClient(new JedisWrapper(new Jedis()));
    }

}
