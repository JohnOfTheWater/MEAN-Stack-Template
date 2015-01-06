var dom = 'react_stuff';

var Footer = React.createClass({displayName: "Footer",
  render:function(){
    return (
        React.createElement("h1", null, "ciao")  
      )
  }
});

React.render(React.createElement(Footer, null), document.getElementById(dom));

