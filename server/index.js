const baseService = (model) => {
  const find = () => {
    console.log("find", model);
  };
  const findById = (id) => {
    console.log(model, id);
  };
  return { find, findById };
};
const appService = baseService.bind(null, "product")();
appService.find();
appService.findById("id so 1");

/** ------------------------------------------------------------- */
const baseService2 = () => {
  const find = function() {
    console.log("find1", this.model);
  };
  const findById = function() {
    console.log(this.model, id);
  };
  return { find, findById };
};

const appService1 = baseService.bind({model: "product"})();
appService.find();
appService.findById("id so 2");

appService1.updateById = function (id){
  console.log("update ", id)
}

appService1.updateById("cart so 2")