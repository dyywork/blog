---
date: 2024-04-26
category:
- tool
tag: nodeVersion volta
---

# Volta

## node版本管理工具

- 可以指定项目使用的node版本，控制同一个机器上多个项目使用不同的node版本

## 安装

### Unix 安装

```bash
curl https://get.volta.sh | bash
```

### Windows 安装

[下载并运行 Windows 安装程序](https://github.com/volta-cli/volta/releases/download/v1.1.1/volta-1.1.1-windows-x86_64.msi) 按照步骤安装

## 安装node

```bash
volta install node           #安装最新的LTS版本
volta install node@14        #安装合适版本
volta install node@16.14.2   #安装指定版本
```

## 固定项目node版本

```bash
volta pin node@16.14.2
volta pin yarn@2.3.1
```

### 在package.json中

```json
"volta": {
  "node": "18.19.0",
  "yarn": "1.19.2"
}
```

## volta 命令

```bash
The JavaScript Launcher ⚡

    To install a tool in your toolchain, use `volta install`.
    To pin your project's runtime or package manager, use `volta pin`.

USAGE:
    volta [FLAGS] [SUBCOMMAND]

FLAGS:
        --verbose    
            Enables verbose diagnostics

        --quiet      
            Prevents unnecessary output

    -v, --version    
            Prints the current version of Volta

    -h, --help       
            Prints help information


SUBCOMMANDS:
    fetch          Fetches a tool to the local machine
    install        Installs a tool in your toolchain
    uninstall      Uninstalls a tool from your toolchain
    pin            Pins your project's runtime or package manager
    list           Displays the current toolchain
    completions    Generates Volta completions
    which          Locates the actual binary that will be called by Volta
    setup          Enables Volta for the current user / shell
    help           Prints this message or the help of the given subcommand(s)
```
