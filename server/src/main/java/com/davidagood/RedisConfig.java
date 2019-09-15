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
        Jedis jedis = new Jedis();
        failIfNotConnectedToRedis(jedis);
        return RedisForJavaFactory.newRedisClient(new JedisWrapper(jedis));
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
