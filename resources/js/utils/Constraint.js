export let constraints = {    
   
};

const notEmptyConstraint = ['email', 'password', 'title', 'content', 'notAssigned'];
notEmptyConstraint.forEach((key) => {
  constraints[key] = {
    presence: {
      allowEmpty: false
    }
  }
})
