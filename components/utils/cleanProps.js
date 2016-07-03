const keys = {
  limit: true,
  composeTheme: true,
  showSuggestionsWhenValueIsSet: true,
  source: true,
  selectedPosition: true,
  suggestionMatch: true
};

export default function cleanProps (props) {

  const newProps = {};
  for (const k of Object.keys(props)) {
    if (!keys[k]) {
      newProps[k] = props[k];
    }
  }

  return newProps;
}
