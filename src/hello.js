function sayHello(to) {
    var helloCompile = _.template('Hello, <%= name %>!');
    var hello = helloCompile({'name': to});
    return hello;
}
