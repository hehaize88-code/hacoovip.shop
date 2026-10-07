/* Keep the native catalog form usable even if analytics is unavailable. */
document.addEventListener('submit', function (event) {
  var form = event.target;
  if (!form.matches || !form.matches('form[data-track="main_search_submit"]')) return;
  var input = form.querySelector('[name="keywords"]');
  if (!input) return;
  input.value = input.value.trim();
  if (!input.value) {
    event.preventDefault();
    input.focus();
  }
}, true);
