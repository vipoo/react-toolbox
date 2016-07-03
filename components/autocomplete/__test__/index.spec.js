import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import theme from '../theme.scss';
import Autocomplete from '../Autocomplete';

const stubSource = [[0, 'zero'], [1, 'one']];

describe('Autocomplete', function () {
  describe('#render', function () {
    it('does not raise any react warnings', function () {

      const comp = (<Autocomplete
              limit={100}
              showSuggestionsWhenValueIsSet={false}
              theme={theme}
              label="Label"
              filter={Autocomplete.caseInsensitiveFilter}
              source={stubSource}
              multiple={false}
              value={null}
              hint='hint text'
            />);

      const mounting = TestUtils.renderIntoDocument(comp);
      const html = ReactDOM.findDOMNode(mounting).innerHTML;

      expect(html).toContain('hint text');
      expect(html).toContain('label');

    });
  });
});

