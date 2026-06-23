---
title: Redis 文档
permalink: /pages/redis/
---

Redis 是基于内存的高性能键值数据库，支持多种数据结构，常用于缓存、会话、消息队列、排行榜等场景。

## 快速连接

```bash
redis-cli -h 127.0.0.1 -p 6379
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `PING` | 测试连接 |
| `INFO` | 查看服务信息 |
| `DBSIZE` | 当前库 key 数量 |
| `KEYS pattern` | 按模式查找 key（生产环境慎用） |
| `TTL key` | 查看 key 剩余过期时间 |
| `DEL key` | 删除 key |
| `FLUSHDB` | 清空当前库（慎用） |
| `MONITOR` | 实时查看命令流（调试用） |

## 数据类型与示例

### String

```bash
SET user:1:name "alice"
GET user:1:name
SET session:abc123 "payload" EX 3600
INCR page:views
```

### Hash

```bash
HSET user:1 name alice age 28
HGET user:1 name
HGETALL user:1
```

### List

```bash
LPUSH queue:jobs job-1
RPOP queue:jobs
LRANGE queue:jobs 0 -1
```

### Set

```bash
SADD tags:article:1 mysql redis database
SMEMBERS tags:article:1
SISMEMBER tags:article:1 redis
```

### Sorted Set

```bash
ZADD leaderboard 100 user:alice 95 user:bob
ZREVRANGE leaderboard 0 9 WITHSCORES
```

## 过期与淘汰

```bash
EXPIRE cache:home 300
PERSIST cache:home
```

常见策略：

- **缓存**：设置 TTL，避免脏数据长期存在
- **会话**：按登录态过期时间设置
- **热点数据**：结合业务刷新策略，避免集中失效

## 持久化

| 方式 | 特点 |
|------|------|
| RDB | 定时快照，恢复快，可能丢失最近一次快照后的数据 |
| AOF | 记录写命令，数据更安全，文件体积可能更大 |

生产环境可根据 RPO/RTO 要求选择 RDB、AOF 或混合模式。

## 典型应用场景

- **页面缓存**：减轻 MySQL 读压力
- **分布式锁**：`SET lock:resource NX EX 30`
- **计数器 / 排行榜**：`INCR`、`ZADD`
- **消息队列**：List 或 Stream
- **限流**：固定窗口 / 滑动窗口计数

## 分布式锁示例

```bash
SET lock:order:1001 token-uuid NX EX 30
```

释放锁时应校验 value，避免误删其他客户端持有的锁。

## 常见问题

**内存占用高**：检查大 key、无 TTL 的 key、不合理的数据结构选型。

**缓存穿透**：对不存在的数据做短 TTL 空值缓存或布隆过滤器。

**缓存击穿**：热点 key 过期时使用互斥锁或逻辑过期。

**缓存雪崩**：TTL 加随机偏移，避免同一时刻大量 key 失效。

## 参考链接

- [Redis 官方文档](https://redis.io/docs/)
- [Redis 命令参考](https://redis.io/commands/)
