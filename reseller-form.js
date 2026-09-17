const steps = [...document.querySelectorAll('.form-step')];
const next = document.querySelector('#next-button');
const back = document.querySelector('#back-button');
const submit = document.querySelector('#submit-button');
let current = 0;

function checkboxGroupsValid(step) {
  const groups = [...step.querySelectorAll('input[type="checkbox"]')].reduce((all, input) => {
    if (!input.required && input.name !== 'Declaration accepted') (all[input.name] ||= []).push(input);
    return all;
  }, {});
  const requiredGroups = {
    'Promotion channels': 'Choose at least one way you will promote OTECH products.',
    'Products of interest': 'Choose at least one product category.',
    'Potential customers': 'Choose at least one potential customer group.',
    'Desired reseller resources': 'Choose at least one reseller resource.'
  };
  for (const [name, message] of Object.entries(requiredGroups)) {
    if (groups[name] && !groups[name].some(input => input.checked)) { alert(message); return false; }
  }
  return true;
}
function validCurrentStep() {
  const inputs = [...steps[current].querySelectorAll('input, select, textarea')];
  for (const input of inputs) { if (!input.checkValidity()) { input.reportValidity(); return false; } }
  return checkboxGroupsValid(steps[current]);
}
function render() {
  steps.forEach((step, index) => step.classList.toggle('active', index === current));
  document.querySelector('#step-label').textContent = `Step ${current + 1} of ${steps.length}`;
  document.querySelector('#percent').textContent = `${(current + 1) * 20}%`;
  document.querySelector('#progress-bar').style.width = `${(current + 1) * 20}%`;
  back.style.display = current ? 'inline-block' : 'none';
  next.style.display = current === steps.length - 1 ? 'none' : 'inline-block';
  submit.style.display = current === steps.length - 1 ? 'inline-block' : 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
next.addEventListener('click', () => { if (validCurrentStep()) { current++; render(); } });
back.addEventListener('click', () => { current--; render(); });
document.querySelector('#reseller-form').addEventListener('submit', event => { if (!validCurrentStep()) event.preventDefault(); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#return-url').value = new URL('confirmation.html', window.location.href).href;
