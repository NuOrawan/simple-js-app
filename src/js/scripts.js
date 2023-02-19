/* Create Pokemon Repository. Wrap pokemonList array in an IIFE to avoid accidentally accessing the global state. */
/* global */

const pokemonRepository = (function () {
  // This array contains Pokémon data to display in the application.
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';
  const modalContainer = document.querySelector('#modal-container');
  const loaderElement = document.querySelector('.loader');

  // Add Pokemon objects to the array. Pokemon object contain name and url 
  function add (pokemon) {
    // Check if parameter is type of Object and not null
    if (
      typeof pokemon === 'object' &&
      pokemon !== null &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid input! Please try again.');
    }
  }
  // Get all Pokemon from the list
  function getAll () {
    return pokemonList;
  }

  // Create pokemon buttons and when a button is clicked show Pokemon's details. Input Pokemon is an object containing name
  function addListItem (pokemon) {
    // eslint-disable-next-line no-undef
    const pokemonListElement = $('.pokemon-list');
    // eslint-disable-next-line no-undef
    const button = $(
      '<button class="pokemon-button btn btn-info float-md-left float-lg-left" data-target="#pokemonModal" data-target="modal">' +
        pokemon.name +
        '</button>'
    );
    pokemonListElement.append(button);
    button.on('click', function () {
      showDetails(pokemon);
    });
  }

  // Show loading message in div while Pokemon is loading
  function showLoadingMessage () {
    loaderElement.classList.add('loader');
  }

  // Hide loading message in div when page is done loading
  function hideLoadingMessage () {
    loaderElement.classList.add('loader-hidden');
    // eslint-disable-next-line no-undef
    $('.loader').remove();
  }

  // ??
  function loadList () {
    // Display loading message while Pokemons are being loaded.
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
        // Hide loading message once all Pokemon is done loading.
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Load details of each pokemon from external API
  function loadDetails (item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Show details of Pokemon's name, height and type in modal.
  function showDetails (item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  // Show types of each Pokemon
  function showTypes (pokemon) {
    let typesElement = '';
    // Loop through types which is an object from pokeapi.co containing name(s) of type(s)
    pokemon.types.forEach(function (obj) {
      const types = obj.type;
      const name = types.name;
      typesElement = typesElement + name + ' ';
    });
    return typesElement;
  }

  // Hide modal
  function hideModal () {
    modalContainer.classList.remove('is-visible');
  }

  // Show a modal with the Pokémon’s name, its height, and an image of the Pokémon.
  function showModal (item) {
    // eslint-disable-next-line no-undef
    const modalBody = $('.modal-body');
    // eslint-disable-next-line no-undef
    const modalTitle = $('.modal-title');

    // Clear existing title and body in modal
    modalTitle.empty();
    modalBody.empty();
    // eslint-disable-next-line no-undef
    const nameElement = $('<h3>' + item.name + '</h3>');
    // eslint-disable-next-line no-undef
    const imageElement = $('<img>');
    imageElement.addClass('.modal-img');
    imageElement.attr('src', item.imageUrl);
    imageElement.attr('width', '50%');
    imageElement.attr('height', '50%');
    // eslint-disable-next-line no-undef
    const heightElement = $(
      '<p class="h6">' + 'Height: ' + item.height + '</p>'
    );
    // eslint-disable-next-line no-undef
    const typesElement = $(
      '<p class="h6">' + 'Type: ' + showTypes(item) + '</p>'
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);

    // eslint-disable-next-line no-undef
    const pokemonModal = $('#pokemonModal');
    pokemonModal.modal('show');
  }

  return {
    addListItem,
    add,
    getAll,
    showLoadingMessage,
    hideLoadingMessage,
    loadList,
    loadDetails,
    showDetails,
    hideModal,
    showModal
  };
})();

pokemonRepository.loadList().then(function () {
  // Iterate each object in pokemonRepository using forEach()
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search form validation
(function () {
  // eslint-disable-next-line no-undef
  const nameInput = $('#pokemonName');
  // Show error message if input is empty
  function showErrorMessage (input, message) {
    const messageContainer = input.parent(); // ie. .input-wrapper
    const error = messageContainer.find('.error-message');
    if (error) {
      // eslint-disable-next-line no-undef
      $('.error-message').remove();
    }
    if (message) {
      // eslint-disable-next-line no-undef
      const error = $('<div class="break error-message"></div>');
      error.text(message);
      messageContainer.append(error);
    }
  }
  // Validate name. Name should not be empty.
  function validateName () {
    const value = nameInput.val();
    if (!value) {
      showErrorMessage(nameInput, 'Name is required.');
      return false;
    }
    showErrorMessage(nameInput, null);
    return true;
  }
  // Search pokemon in the array by name
  function findByName (name) {
    if (typeof name === 'string' && name.length > 0) {
      // Create variable for API url and get Pokemon by name
      const apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + name;

      // Find a match by name and return its details ie. image, height and type
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          // Create an object, Pokemon that contains imageUrl to show in a modal
          const pokemon = response;
          pokemon.imageUrl = response.sprites.front_default;
          pokemonRepository.showModal(pokemon);
        })
        .catch(function (e) {
          showErrorMessage(nameInput, 'Sorry! Not found.');
        });
    } else {
      console.log('Sorry! Not found.');
    }
  }

  function validateForm () {
    const isValidName = validateName();
    if (isValidName) {
      findByName(nameInput.val().toLowerCase());
    }
  }
  // eslint-disable-next-line no-undef
  $('form').submit(function (e) {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success');
      findByName(nameInput);
    }
  });
  nameInput.on('input', validateName);
})();
