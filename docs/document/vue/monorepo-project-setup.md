---
date: 2026-05-29
category: vue
---

# Monorepo 管理端项目搭建记录

## 概述

使用 pnpm workspaces + Turborepo 搭建 Monorepo 架构的管理端全栈项目。后端采用 NestJS + TypeORM + MySQL，前端采用 Vite + Vue 3 + Element Plus，前后端共享类型定义。

## 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 包管理 | pnpm workspaces | Monorepo 标准方案 |
| 构建 | Turborepo | 增量构建、任务编排 |
| 后端 | NestJS + TypeORM | TypeORM 与 NestJS 深度集成 |
| 数据库 | MySQL | 关系型数据库 |
| 前端 | Vite + Vue 3 + Element Plus + Pinia + Vue Router | 现代前端方案 |
| 测试 | Vitest（前后端统一） | 兼容 Vite 生态 |
| API 文档 | @nestjs/swagger（OpenAPI） | 自动生成接口文档 |

## 目录结构

```
monorepo/
├── pnpm-workspace.yaml        # 工作空间配置
├── turbo.json                  # Turborepo 任务编排
├── tsconfig.base.json          # 基础 TypeScript 配置
├── .npmrc                      # pnpm 配置
│
├── packages/
│   ├── shared/                 # 共享类型包（接口、枚举、DTO）
│   ├── server/                 # NestJS 后端
│   │   └── src/
│   │       ├── main.ts         # 入口（CORS、Swagger、全局管道）
│   │       ├── app.module.ts   # 根模块
│   │       ├── database/       # TypeORM + MySQL 配置
│   │       ├── modules/
│   │       │   ├── auth/       # JWT 登录/注册
│   │       │   └── user/       # 用户 CRUD
│   │       └── common/         # 守卫、装饰器、过滤器、拦截器
│   │
│   └── web/                    # Vue 3 前端
│       └── src/
│           ├── api/            # Axios 封装 + API 层
│           ├── router/         # 路由 + 守卫
│           ├── stores/         # Pinia 状态管理
│           ├── layouts/        # 后台布局
│           └── views/          # 页面组件
```

## 关键实现

### Monorepo 配置

根目录 `pnpm-workspace.yaml` 声明工作空间：

```yaml
packages:
  - 'packages/*'
```

根 `package.json` 配置 Turborepo 脚本，通过 `turbo run dev` 并行启动前后端。

### 后端认证流程

1. 用户登录 → AuthController 接收用户名密码
2. AuthService 校验凭据 → 使用 bcryptjs 比对密码哈希
3. 验证通过 → JwtService 签发 Token（包含 sub、username）
4. Passport JwtStrategy 从请求头提取 Token 并验证
5. 全局 JwtAuthGuard 保护需要登录的路由

### 用户权限控制

- JwtAuthGuard：验证 JWT Token 有效性
- RolesGuard：基于角色的访问控制
- @Roles('admin') 装饰器声明接口所需角色

### 前端架构

- Axios 封装统一请求/响应拦截，自动携带 Token
- 401 响应自动清除 Token 并跳转登录页
- Pinia auth store 管理登录状态
- 路由守卫 beforeEach 检查登录状态
- Element Plus 布局组件搭建后台界面

### 测试方案

使用 Vitest 作为统一测试框架。需要注意的是 NestJS + TypeORM 项目中，由于 `emitDecoratorMetadata` 的依赖，需要使用 SWC （`unplugin-swc`）转换测试文件以支持装饰器元数据。

```ts
// vitest.config.ts 关键配置
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: { syntax: 'typescript', decorators: true },
        transform: { decoratorMetadata: true, legacyDecorator: true },
      },
    }),
  ],
});
```

## 启动方式

```bash
# 安装依赖
pnpm install

# 配置数据库（编辑 packages/server/.env）
# DB_HOST=localhost DB_PORT=3306 DB_USERNAME=root DB_PASSWORD=root DB_DATABASE=admin_monorepo

# 启动全部服务
pnpm dev

# 或分别启动
pnpm --filter @monorepo/server dev    # http://localhost:3000
pnpm --filter @monorepo/web dev       # http://localhost:5173

# 运行测试
pnpm test

# API 文档
# http://localhost:3000/api/docs
```

## 踩坑记录

1. **TypeORM 装饰器元数据**：Vitest 默认使用 esbuild 转换，不支持 `emitDecoratorMetadata`。需要引入 `unplugin-swc` + `@swc/core` 处理。
2. **pnpm build scripts**：`@nestjs/core` 和 `esbuild` 需要配置 `pnpm.onlyBuiltDependencies` 才能运行 postinstall 脚本。
3. **Turbo test 依赖 build**：测试任务依赖构建任务，需要确保 `tsconfig.json` 排除 `.spec.ts` 文件免得构建报错。
