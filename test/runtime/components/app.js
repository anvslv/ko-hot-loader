import './sut'
import ko from 'knockout';
import domready from 'domready';

window.onbeforeunload = () => {
  throw new Error('SHOULD NOT DO A FULL PAGE RELOAD')
}

domready(() => {
  ko.applyBindings();
});

 