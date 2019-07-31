const { LiveReloadCompiler } = require('@nestjs/ng-universal');

const compiler = new LiveReloadCompiler({
  projectName: 'fullstack-nestjs-angular-boilerplate'
});
compiler.run();
