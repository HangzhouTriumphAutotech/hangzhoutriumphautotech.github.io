# TradeInWork 官方网站

纯静态站点（HTML + CSS + JS），用于展示 **TradeInWork** 外贸数字化品牌及旗下产品。

## 品牌与产品

| 名称 | 定位 |
|------|------|
| **TradeInWork** | 品牌 / 官网（tradeinwork.com） |
| **TradeWork** | 首款产品：AI 外贸 SOHO 本地客户管理系统（可下载 Windows 安装包） |
| *更多产品* | 筹备中，站点已预留产品矩阵展示位 |

## 部署

将仓库根目录下全部文件发布到 `https://tradeinwork.com/` 根路径即可。

建议服务器配置：

- `index.html` 为默认文档
- 启用 HTTPS
- 正确提供 `robots.txt` 与 `sitemap.xml`
- 可选：gzip/brotli 压缩静态资源

## 本地预览

```bash
npx --yes serve .
# 或
python -m http.server 8080
```

## 文件结构

```
├── index.html      # 品牌首页 + TradeWork 产品详情
├── css/styles.css
├── js/main.js
├── assets/logo.png
├── robots.txt
├── sitemap.xml
└── README.md
```

## 联系信息（站点内已配置）

- 公司：宁波西泠人工智能科技有限公司
- 品牌：https://tradeinwork.com/
- 电话：+86 13123371024
