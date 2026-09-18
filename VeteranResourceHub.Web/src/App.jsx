import { useEffect, useState } from 'react'
import valorVaultHero from './assets/valor-vault-hero.png'
import './App.css'

function App() {
  // Controls whether the splash screen is displayed.
  const [showSplash, setShowSplash] = useState(true)

  // Stores resources received from the ASP.NET Core API.
  const [resources, setResources] = useState([])

  // Stores the resource selected by the user.
  const [selectedResource, setSelectedResource] = useState(null)

  // Tracks API loading and error states.
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // =========================================
  // LOAD RESOURCES FROM ASP.NET CORE API
  // =========================================

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch(
          'http://localhost:5260/api/resources'
        )

        if (!response.ok) {
          throw new Error(
            `Unable to load resources. Status: ${response.status}`
          )
        }

        const data = await response.json()

        setResources(data)
      } catch (err) {
        console.error('Error loading resources:', err)

        setError(
          'Resources could not be loaded. Make sure the Valor Vault API is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadResources()
  }, [])

  // =========================================
  // SPLASH SCREEN
  // =========================================

  if (showSplash) {
    return (
      <section
        className="splash-screen"
        style={{ backgroundImage: `url(${valorVaultHero})` }}
      >
        <div className="splash-overlay">
          <div className="splash-content">
            <p className="welcome-eyebrow">
              WELCOME TO
            </p>

            <h1>Valor Vault</h1>

            <p className="welcome-tagline">
              Honoring Service. Preserving Stories. Connecting Veterans.
            </p>

            <button
              type="button"
              className="enter-button"
              onClick={() => setShowSplash(false)}
            >
              Enter Valor Vault
            </button>
          </div>
        </div>
      </section>
    )
  }

  // =========================================
  // MAIN WEBSITE
  // =========================================

  return (
    <div className="valor-vault">

      {/* =====================================
          HEADER
          ===================================== */}

      <header className="site-header">
        <div className="brand">
          <h1>Valor Vault</h1>
          <p>Veteran Resource Hub</p>
        </div>

        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#resources">Resources</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>

        {/* ===================================
            HERO
            =================================== */}

        <section
          id="home"
          className="main-hero"
        >
          <div className="hero-content">
            <p className="eyebrow">
              Veterans • Families • Community
            </p>

            <h2>
              A trusted place for those who served.
            </h2>

            <p>
              Valor Vault connects veterans and their families with useful
              resources, information, and community support.
            </p>

            <a
              href="#resources"
              className="primary-button"
            >
              Explore Resources
            </a>
          </div>
        </section>

        {/* ===================================
            RESOURCES
            =================================== */}

        <section
          id="resources"
          className="resources-section"
        >
          <p className="eyebrow">
            Resources
          </p>

          <h2>
            Find the support you need
          </h2>

          {/* Loading message */}

          {loading && (
            <p>
              Loading veteran resources...
            </p>
          )}

          {/* API error message */}

          {error && (
            <p className="resource-error">
              {error}
            </p>
          )}

          {/* Resource cards */}

          {!loading && !error && (
            <div className="resource-grid">
              {resources.map((resource) => (
                <article
                  className="resource-card"
                  key={resource.id}
                >
                  <h3>
                    {resource.title}
                  </h3>

                  <p>
                    {resource.description}
                  </p>

                  <button
                    type="button"
                    className="resource-button"
                    onClick={() =>
                      setSelectedResource(resource)
                    }
                  >
                    View Resources
                  </button>
                </article>
              ))}
            </div>
          )}

          {/* =================================
              SELECTED RESOURCE
              ================================= */}

      {selectedResource && (
  <div className="resource-details">
    <p className="eyebrow">
      Selected Resource
    </p>

    <h3>
      {selectedResource.title}
    </h3>

    <p>
      {selectedResource.details}
    </p>

    {/* Official resource links */}
    {selectedResource.links &&
      selectedResource.links.length > 0 && (
        <div className="official-resources">
          <h4>Official Resources</h4>

          <div className="resource-links">
            {selectedResource.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="official-resource-link"
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        </div>
      )}

    <button
      type="button"
      className="close-resource-button"
      onClick={() => setSelectedResource(null)}
    >
      Close
    </button>
  </div>
)}
        </section>

        {/* ===================================
            ABOUT
            =================================== */}

        <section
          id="about"
          className="resources-section"
        >
          <p className="eyebrow">
            About Valor Vault
          </p>

          <h2>
            Built to connect veterans with resources.
          </h2>

          <p>
            Valor Vault is a veteran resource hub designed to make useful
            information easier to find. The goal is to provide veterans,
            service members, and their families with a central place to
            discover resources related to benefits, education, employment,
            healthcare, housing, and community support.
          </p>
        </section>

        {/* ===================================
            CONTACT
            =================================== */}

        <section
          id="contact"
          className="resources-section"
        >
          <p className="eyebrow">
            Contact
          </p>

          <h2>
            Connect with Valor Vault
          </h2>

          <p>
            Have a resource to recommend or information that could help the
            veteran community? Valor Vault is designed to grow as a useful
            collection of veteran-focused resources and information.
          </p>
        </section>

      </main>

      {/* =====================================
          FOOTER
          ===================================== */}

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Valor Vault. Veteran Resource Hub.
        </p>
      </footer>

    </div>
  )
}

export default App