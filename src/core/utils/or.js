export default (...args) => args.reduce((acc, arg) => arg || acc, false);
