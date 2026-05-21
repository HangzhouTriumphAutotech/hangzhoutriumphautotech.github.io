# TradeInWork 官方网站

纯静态站点（HTML + CSS + JS），用于展示 **TradeInWork 外贸客户管理系统** 产品能力。

## 部署

将 `website/` 目录下全部文件发布到 `https://tradeinwork.com/` 根路径即可。

建议服务器配置：

- `index.html` 为默认文档
- 启用 HTTPS
- 正确提供 `robots.txt` 与 `sitemap.xml`
- 可选：gzip/brotli 压缩静态资源

## 本地预览

```bash
# 在 website 目录启动简易 HTTP 服务（任选其一）
npx --yes serve website
# 或
python -m http.server 8080 --directory website
```

## 文件结构

```
website/
├── index.html      # 落地页（含 SEO meta 与 JSON-LD）
├── css/styles.css  # 与桌面端灰色主题对齐
├── js/main.js      # 导航、滚动、入场动画
├── assets/logo.png
├── robots.txt
├── sitemap.xml
└── README.md
```

## 联系信息（站点内已配置）

- 公司：宁波西泠人工智能科技有限公司
- 网站：https://tradeinwork.com/
- 电话：+86 13123371024
