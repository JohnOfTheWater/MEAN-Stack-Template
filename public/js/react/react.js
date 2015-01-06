 /** @jsx React.DOM */ 

var dom = 'react_stuff';
console.log('it works now!!');

var Footer = React.createClass({
  render:function(){
    return (
        <h1>ciao</h1>  
      )
  }
});

React.render(<Footer />, document.getElementById(dom));

