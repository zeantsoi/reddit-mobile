import React from 'react/addons';
import Utils from '../../lib/danehansen/utils/Utils';

class MobileButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      touch: false,
    };

    this._over = this._over.bind(this);
    this._out = this._out.bind(this);
  }

  renderChildren() {
    return React.Children.map(this.props.children, function(child) {
      var type = child.type;
      if (!type || typeof type === 'string') {
        return child;
      } else {
        return React.addons.cloneWithProps(child, {played: this.state.hover});
      }
    }.bind(this));
  }

  click() {
    // a no-op to prevent errors
  }

  render() {
    var move = this.props.move;
    var href = this.props.href;
    var click = this.props.onClick || this.click;

    var props = Object.assign({}, this.props);

    delete props.className;
    delete props.move;
    delete props.over;
    delete props.out;

    if(this.state.touch) {
      props.onTouchStart = this._over;
      props.onTouchEnd = this._out;
      if(move) {
        props.onTouchMove = move;
      }
    } else {
      props.onMouseEnter = this._over;
      props.onMouseLeave = this._out;
      if(move) {
        props.onMouseMove = move;
      }
    }
    props.className = 'MobileButton ' + this.props.className + (this.state.hover ? ' hover' : '');

    if (href) {
      return (
        <a {...props} onClick={ click }>
          { this.renderChildren() }
        </a>
      );
    } else {
      return (
        <button {...props} onClick={ click }>
          { this.renderChildren() }
        </button>
      );
    }
  }

  componentDidMount() {
    this.setState({touch: Utils.touch()});
  }

  _over(evt) {
    this.setState({hover: true});
    if (this.props.over) {
      this.props.over(evt);
    }
  }

  _out(evt) {
    this.setState({hover: false});
    if (this.props.out) {
      this.props.out(evt);
    }
  }
}

function MobileButtonFactory(app) {
  return app.mutate('core/components/MobileButton', MobileButton);
}

export default MobileButtonFactory;
