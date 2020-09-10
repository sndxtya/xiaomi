// 1.导包
const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const autoPrefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const webserver = require("gulp-webserver");
const fileInclude = require("gulp-file-include");

// 2.创建任务
// 2-1创建一个压缩css的任务
const cssHandler = function () {
  return gulp
    .src("./src/css/*.css")
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css/"));
};
// 2-2创建一个打包sass的任务
const sassHandler = function () {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/sass/"));
};
// 2-3创建一个打包js文件的任务
const jsHandler = function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js/"));
};
// 2-4创建一个打包html文件的任务
const htmlHandler = function () {
  return gulp
    .src("./src/pages/*.html")
    .pipe(
      fileInclude({
        prefix: "@-@",
        basepath: "./src/components",
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true, // 表示移出空格
        removeEmptyAttributes: true, // 表示移出空的属性(仅限于原生属性)
        collapseBooleanAttributes: true, // 移出 checked 类似的布尔值属性
        removeAttributeQuotes: true, // 移出属性上的双引号
        minifyCSS: true, // 压缩内嵌式 css 代码(只能基本压缩, 不能自动添加前缀)
        minifyJS: true, // 压缩内嵌式 JS 代码(只能基本压缩, 不能进行转码)
        removeStyleLinkTypeAttributes: true, // 移出 style 和 link 标签上的 type 属性
        removeScriptTypeAttributes: true, // 移出 script 标签上默认的 type 属性
      })
    )
    .pipe(gulp.dest("./dist/pages/"));
};
// 2-5创建一个删除dist目录的任务
const delHandler = function () {
  return del(["./dist/"]);
};
// 2-6 创建一个启动 服务器的任务
const webHandler = function () {
  return gulp.src("./dist").pipe(
    webserver({
      host: "www.congdelong.com",
      port: "80",
      livereload: true,
      open: "./pages/index.html",
      proxies: [
        {
          source: "/dt",
          target: "https://www.duitang.com/napi/index/hot/",
        },
      ],
    })
  );
};
module.exports.cssHandler = cssHandler;
// 2-7 创建一个监控任务
const watchHandler = function () {
  // 使用gulp.watch
  gulp.watch("./src/sass/*.scss", sassHandler);
  gulp.watch("./src/css/*.css", cssHandler);
  gulp.watch("./src/js/*.js", jsHandler);
  gulp.watch("./src/pages/*.html", htmlHandler);
};
module.exports.default = gulp.series(
  delHandler,
  gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler),
  webHandler,
  watchHandler
);
