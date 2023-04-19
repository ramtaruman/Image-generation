function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const init_prompt = document.getElementById('prompt').value;
    console.log(init_prompt);
    const style_prompt = document.getElementById('style-prompt').value;
    console.log(style_prompt);
    const color_prompt = document.getElementById('color-prompt').value;
    console.log(color_prompt);
    const size = document.querySelector('#size').value;

    if (init_prompt === '') {
      alert('Please add some text');
      return;
    }
    if (style_prompt === '') {
      alert('Please add a style');
      return;
    }
    if (color_prompt === '') {
      alert('Please add a color palette');
      return;
    }
    const prompt = init_prompt + ' in the style of ' + style_prompt + ' with a ' + color_prompt +' tone '
    generateImageRequest(prompt, size);
  }

  async function generateImageRequest(prompt, size) {
    try {
      showSpinner();

      const response = await fetch('/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });

      if (!response.ok) {
        removeSpinner();
        throw new Error('That image could not be generated');
      }

      const data = await response.json();
      // console.log(data);

      const imageUrl = data.data;

      document.querySelector('#image').src = imageUrl;

      removeSpinner();
    } catch (error) {
      document.querySelector('.msg').textContent = error;
    }
  }

  function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
  }

  function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
  }

  document.querySelector('#image-form').addEventListener('submit', onSubmit);
