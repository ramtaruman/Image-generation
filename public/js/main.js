function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const init_prompt = document.querySelector('#prompt').value;
    const type_prompt = document.getElementById('imgtyp').value;
    console.log(type_prompt);
    const style_prompt = document.getElementById('imgstyl').value;
    console.log(style_prompt);
    const color_prompt = document.getElementById('imgclr').value;
    console.log(color_prompt);
    const content_prompt = document.getElementById('imgcnt').value;
    console.log(content_prompt);
    const mood_prompt = document.getElementById('imgmod').value;
    console.log(mood_prompt);
    const bg_prompt = document.getElementById('imgbg').value;
    console.log(bg_prompt);
    const size = document.querySelector('#size').value;

    if (init_prompt === '') {
      alert('Please add some text');
      return;
    }
    const prompt = init_prompt + ' in a setting of ' + type_prompt + ', in a ' + style_prompt +' style, with a color scheme of  ' + color_prompt + ' having content of ' + content_prompt + ' with ' + mood_prompt + ' mood and with background ' +bg_prompt
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
