//External imports
import { useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';

const loadScript = (src) =>
    new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
})

const GoogleAuthButton = () => {

  const googleButton = useRef(null);

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client';
    const id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    loadScript(src)
      .then(() => {
        console.log(id)
        /*global google*/
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current,
          { theme: 'outline', size: 'large' }
        )
        google.accounts.id.prompt(); // also display the One Tap dialog
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObj = jwt_decode(response.credential);
    console.log(userObj);
  }

  return (
    <div ref={googleButton}></div>
  )
}

export default GoogleAuthButton