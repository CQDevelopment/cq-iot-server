module.exports = () => {
    const self = this;

    self.value = ['initial'];

    self.update = (value) => {
        self.value = value;
        self.subscription(self.value);
    };

    self.subscription = (value) => { };

    return self;
};