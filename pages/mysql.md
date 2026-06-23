---
title: MySQL 文档
permalink: /pages/mysql/
---

MySQL 是最常用的开源关系型数据库，适用于事务型业务、结构化数据存储与复杂查询场景。

## 快速连接

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `SHOW DATABASES;` | 查看所有数据库 |
| `USE db_name;` | 切换数据库 |
| `SHOW TABLES;` | 查看当前库中的表 |
| `DESC table_name;` | 查看表结构 |
| `SHOW CREATE TABLE table_name;` | 查看建表语句 |
| `SHOW PROCESSLIST;` | 查看当前连接与 SQL |
| `SHOW STATUS LIKE 'Threads_connected';` | 查看当前连接数 |

## 用户与权限

```sql
-- 创建用户
CREATE USER 'app'@'%' IDENTIFIED BY 'your_password';

-- 授权
GRANT SELECT, INSERT, UPDATE, DELETE ON app_db.* TO 'app'@'%';

-- 刷新权限
FLUSH PRIVILEGES;
```

## 常用 SQL 示例

```sql
-- 建表
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(128) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入
INSERT INTO users (username, email) VALUES ('alice', 'alice@example.com');

-- 查询
SELECT id, username, email FROM users WHERE username = 'alice';

-- 更新
UPDATE users SET email = 'alice.new@example.com' WHERE id = 1;

-- 删除
DELETE FROM users WHERE id = 1;
```

## 索引建议

- 为高频查询条件、JOIN 字段、ORDER BY 字段建立合适索引
- 避免在低区分度字段上单独建索引
- 组合索引遵循最左前缀原则
- 使用 `EXPLAIN` 分析执行计划

```sql
EXPLAIN SELECT * FROM users WHERE username = 'alice';
```

## 备份与恢复

```bash
# 备份单个库
mysqldump -u root -p app_db > app_db.sql

# 恢复
mysql -u root -p app_db < app_db.sql
```

## 常见问题

**连接数过高**：检查慢 SQL、连接池配置、是否存在连接泄漏。

**锁等待**：通过 `SHOW ENGINE INNODB STATUS;` 或 `information_schema` 排查长事务。

**字符集问题**：建议统一使用 `utf8mb4`，避免 emoji 或特殊字符存储异常。

## 参考链接

- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)
