function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;};

//Array for Autocomplete
const autoCompleteArray =
[
  {
    "manufacturer_id": "223",
    "name": "Skip Hop"
  },
  {
    "manufacturer_id": "48",
    "name": "Carter's/ Oshkosh B'Gosh"
  },
  {
    "manufacturer_id": "94",
    "name": "Chicco"
  },
  {
    "manufacturer_id": "132",
    "name": "Medela"
  },
  {
    "manufacturer_id": "41",
    "name": "Tommee Tippee"
  },
  {
    "manufacturer_id": "47",
    "name": "Dr. Brown's"
  },
  {
    "manufacturer_id": "306",
    "name": "Joie"
  },
  {
    "manufacturer_id": "378",
    "name": "Munchkin"
  },
  {
    "manufacturer_id": "390",
    "name": "Pigeon"
  },
  {
    "manufacturer_id": "389",
    "name": "Pampers"
  },
  {
    "manufacturer_id": "402",
    "name": "Taf Toys"
  },
  {
    "manufacturer_id": "392",
    "name": "Farlin"
  },
  {
    "manufacturer_id": "333",
    "name": "Johnson's"
  },
  {
    "manufacturer_id": "121",
    "name": "Stride Rite"
  },
  {
    "manufacturer_id": "111",
    "name": "primark"
  },
  {
    "manufacturer_id": "91",
    "name": "PHILIPS AVENT"
  },
  {
    "manufacturer_id": "19",
    "name": "Fisher Price"
  },
  {
    "manufacturer_id": "34",
    "name": "Dolu"
  },
  {
    "manufacturer_id": "222",
    "name": "Cherokee"
  },
  {
    "manufacturer_id": "224",
    "name": "Al Salwa Publishers"
  },
  {
    "manufacturer_id": "174",
    "name": "The Children's Place"
  },
  {
    "manufacturer_id": "35",
    "name": "Mega Bloks"
  },
  {
    "manufacturer_id": "274",
    "name": "Fine Baby"
  },
  {
    "manufacturer_id": "85",
    "name": "NUK"
  },
  {
    "manufacturer_id": "242",
    "name": "Nuby"
  },
  {
    "manufacturer_id": "9",
    "name": "Hello Kitty"
  },
  {
    "manufacturer_id": "20",
    "name": "Disney"
  }
];

var e = new Array();

for (var i = 0; i < autoCompleteArray.length; i++) {

e[i] = autoCompleteArray[i].name;

}

class Autocomplete {
  constructor({
    rootNode,
    inputNode,
    resultsNode,
    searchFn,
    shouldAutoSelect = false,
    onShow = () => {},
    onHide = () => {} } =
  {}) {_defineProperty(this, "handleDocumentClick",

    event => {
      if (event.target === this.inputNode || this.rootNode.contains(event.target)) {
        return;
      }
      this.hideResults();
    });_defineProperty(this, "handleKeyup",

    event => {
      const { key } = event;

      switch (key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Escape':
        case 'Enter':
          event.preventDefault();
          return;
        default:
          this.updateResults();}


      if (this.hasInlineAutocomplete) {
        switch (key) {
          case 'Backspace':
            return;
          default:
            this.autocompleteItem();}

      }
    });_defineProperty(this, "handleKeydown",

    event => {
      const { key } = event;
      let activeIndex = this.activeIndex;

      if (key === 'Escape') {
        this.hideResults();
        this.inputNode.value = '';
        return;
      }

      if (this.resultsCount < 1) {
        if (this.hasInlineAutocomplete && (key === 'ArrowDown' || key === 'ArrowUp')) {
          this.updateResults();
        } else {
          return;
        }
      }

      const prevActive = this.getItemAt(activeIndex);
      let activeItem;

      switch (key) {
        case 'ArrowUp':
          if (activeIndex <= 0) {
            activeIndex = this.resultsCount - 1;
          } else {
            activeIndex -= 1;
          }
          break;
        case 'ArrowDown':
          if (activeIndex === -1 || activeIndex >= this.resultsCount - 1) {
            activeIndex = 0;
          } else {
            activeIndex += 1;
          }
          break;
        case 'Enter':
          activeItem = this.getItemAt(activeIndex);
          this.selectItem(activeItem);
          return;
        case 'Tab':
          this.checkSelection();
          this.hideResults();
          return;
        default:
          return;}


      event.preventDefault();
      activeItem = this.getItemAt(activeIndex);
      this.activeIndex = activeIndex;

      if (prevActive) {
        prevActive.classList.remove('selected');
        prevActive.setAttribute('aria-selected', 'false');
      }

      if (activeItem) {
        this.inputNode.setAttribute('aria-activedescendant', `autocomplete-result-${activeIndex}`);
        activeItem.classList.add('selected');
        activeItem.setAttribute('aria-selected', 'true');
        if (this.hasInlineAutocomplete) {
          this.inputNode.value = activeItem.innerText;
        }
      } else {
        this.inputNode.setAttribute('aria-activedescendant', '');
      }
    });_defineProperty(this, "handleFocus",

    event => {
      this.updateResults();
    });_defineProperty(this, "handleResultClick",

    event => {
      if (event.target && event.target.nodeName === 'LI') {
        this.selectItem(event.target);
      }
    });_defineProperty(this, "getItemAt",

    index => {
      return this.resultsNode.querySelector(`#autocomplete-result-${index}`);
    });_defineProperty(this, "selectItem",

    node => {
      if (node) {
        this.inputNode.value = node.innerText;
        this.hideResults();
      }
    });_defineProperty(this, "checkSelection",

    () => {
      if (this.activeIndex < 0) {
        return;
      }
      const activeItem = this.getItemAt(this.activeIndex);
      this.selectItem(activeItem);
    });_defineProperty(this, "autocompleteItem",

    event => {
      const autocompletedItem = this.resultsNode.querySelector('.selected');
      const input = this.inputNode.value;
      if (!autocompletedItem || !input) {
        return;
      }

      const autocomplete = autocompletedItem.innerText;
      if (input !== autocomplete) {
        this.inputNode.value = autocomplete;
        this.inputNode.setSelectionRange(input.length, autocomplete.length);
      }
    });_defineProperty(this, "updateResults",

    () => {
      const input = this.inputNode.value;
      const results = this.searchFn(input);

      this.hideResults();
      if (results.length === 0) {
        return;
      }

      this.resultsNode.innerHTML = results.map((result, index) => {
        const isSelected = this.shouldAutoSelect && index === 0;
        if (isSelected) {
          this.activeIndex = 0;
        }
        return `
        <li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? ' selected' : ''}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ''}
        >
          ${result}
        </li>
      `;
      }).join('');

      this.resultsNode.classList.remove('hidden');
      this.rootNode.setAttribute('aria-expanded', true);
      this.resultsCount = results.length;
      this.shown = true;
      this.onShow();
    });_defineProperty(this, "hideResults",

    () => {
      this.shown = false;
      this.activeIndex = -1;
      this.resultsNode.innerHTML = '';
      this.resultsNode.classList.add('hidden');
      this.rootNode.setAttribute('aria-expanded', 'false');
      this.resultsCount = 0;
      this.inputNode.setAttribute('aria-activedescendant', '');
      this.onHide();
    });this.rootNode = rootNode;this.inputNode = inputNode;this.resultsNode = resultsNode;this.searchFn = searchFn;this.shouldAutoSelect = shouldAutoSelect;this.onShow = onShow;this.onHide = onHide;this.activeIndex = -1;this.resultsCount = 0;this.showResults = false;this.hasInlineAutocomplete = this.inputNode.getAttribute('aria-autocomplete') === 'both'; // Setup events
    document.body.addEventListener('click', this.handleDocumentClick);this.inputNode.addEventListener('keyup', this.handleKeyup);this.inputNode.addEventListener('keydown', this.handleKeydown);this.inputNode.addEventListener('focus', this.handleFocus);this.resultsNode.addEventListener('click', this.handleResultClick);}}

const search = input => {
  if (input.length < 1) {
    return [];
  }
  return e.filter(item => item.toLowerCase().startsWith(input.toLowerCase()));
};

const autocomplete = new Autocomplete({
  rootNode: document.querySelector('.autocomplete'),
  inputNode: document.querySelector('.autocomplete-input'),
  resultsNode: document.querySelector('.autocomplete-results'),
  searchFn: search,
  shouldAutoSelect: true });


// document.querySelector('form').addEventListener('submit', event => {
//   event.preventDefault();
//   const result = document.querySelector('.search-result');
//   const input = document.querySelector('.autocomplete-input');
//   result.innerHTML = 'Searched for: ' + input.value;
// });

