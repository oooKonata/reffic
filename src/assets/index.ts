// vite: glob函数导入多模块，动态导入静态资源
const staticResourceModule: Record<string, any> = import.meta.glob(['./**/*.png', './**/*.jpg', './**/*.svg'], {
  import: 'default',
  eager: true,
})

export function loadStaticResource(url: string): string {
  return url.startsWith('/') ? staticResourceModule[`.${url}`] : staticResourceModule[`./${url}`]
}
