import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './EBusinessCard.css'

function EBusinessCard({ onClose }) {
  const [nfcSupported, setNfcSupported] = useState(false)
  const [nfcActive, setNfcActive] = useState(false)
  const [nfcError, setNfcError] = useState(null)
  const nfcWriterRef = useRef(null)

  // URLs de redirection
  const manifestUrl = window.location.origin + '/manifeste'
  const subscriptionUrl = window.location.origin + '/#pricing'

  useEffect(() => {
    // Vérifier le support NFC
    if ('NDEFWriter' in window || ('NDEFReader' in window && 'write' in NDEFReader.prototype)) {
      setNfcSupported(true)
    }

    // Cleanup NFC au démontage
    return () => {
      if (nfcWriterRef.current) {
        setNfcActive(false)
      }
    }
  }, [])

  const handleNfcWrite = async () => {
    if (!nfcSupported) {
      setNfcError('NFC non supporté sur cet appareil')
      return
    }

    try {
      setNfcError(null)
      setNfcActive(true)

      // Utiliser Web NFC API si disponible
      if ('NDEFWriter' in window) {
        const writer = new NDEFWriter()
        await writer.write({
          records: [
            {
              recordType: 'url',
              data: manifestUrl
            }
          ]
        })
        alert('Données NFC écrites avec succès !')
        setNfcActive(false)
      } else if ('NDEFReader' in window && 'write' in NDEFReader.prototype) {
        // Alternative pour Chrome/Edge
        const ndef = new NDEFReader()
        await ndef.write({
          records: [
            {
              recordType: 'url',
              data: manifestUrl
            }
          ]
        })
        alert('Données NFC écrites avec succès !')
        setNfcActive(false)
      } else {
        throw new Error('API NFC non disponible')
      }
    } catch (error) {
      console.error('Erreur NFC:', error)
      setNfcError('Erreur lors de l\'écriture NFC. Assurez-vous que NFC est activé.')
      setNfcActive(false)
    }
  }

  const handleDownloadVCard = () => {
    // Générer un vCard pour téléchargement
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:SmartBankers
ORG:MyDigiSelf SN
URL:${manifestUrl}
NOTE:Rejoignez le mouvement pour une IA éthique et transparente
END:VCARD`

    const blob = new Blob([vCard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'smartbankers.vcf'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="ebusiness-card">
      <div className="ebusiness-card__overlay" onClick={onClose}></div>
      <div className="ebusiness-card__container">
        <button className="ebusiness-card__close" onClick={onClose} aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="ebusiness-card__content">
          <div className="ebusiness-card__header">
            <div className="ebusiness-card__logo">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" fill="black"/>
                <path d="M16 8L24 16L16 24L8 16L16 8Z" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h2 className="ebusiness-card__title">SmartBankers</h2>
            <p className="ebusiness-card__subtitle">MyDigiSelf SN</p>
          </div>

          <div className="ebusiness-card__body">
            <div className="ebusiness-card__section">
              <h3 className="ebusiness-card__section-title">QR Code</h3>
              <p className="ebusiness-card__section-description">
                Scannez ce QR code pour accéder au Manifeste SmartBankers
              </p>
              <div className="ebusiness-card__qr-container">
                <QRCodeSVG
                  value={manifestUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#000000"
                  bgColor="#FFFFFF"
                />
              </div>
              <div className="ebusiness-card__qr-links">
                <a href={manifestUrl} className="ebusiness-card__link" target="_blank" rel="noopener noreferrer">
                  Voir le Manifeste
                </a>
                <a href={subscriptionUrl} className="ebusiness-card__link" target="_blank" rel="noopener noreferrer">
                  S'inscrire maintenant
                </a>
              </div>
            </div>

            <div className="ebusiness-card__divider"></div>

            <div className="ebusiness-card__section">
              <h3 className="ebusiness-card__section-title">NFC</h3>
              <p className="ebusiness-card__section-description">
                Partagez vos informations par simple contact NFC
              </p>
              {nfcSupported ? (
                <div className="ebusiness-card__nfc-container">
                  <button
                    className="ebusiness-card__nfc-button"
                    onClick={handleNfcWrite}
                    disabled={nfcActive}
                  >
                    {nfcActive ? (
                      <>
                        <svg className="ebusiness-card__nfc-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Activation NFC...
                      </>
                    ) : (
                      <>
                        <svg className="ebusiness-card__nfc-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        Activer le partage NFC
                      </>
                    )}
                  </button>
                  {nfcError && (
                    <p className="ebusiness-card__error">{nfcError}</p>
                  )}
                  <p className="ebusiness-card__nfc-info">
                    Approchez votre téléphone d'un autre appareil compatible NFC pour partager
                  </p>
                </div>
              ) : (
                <div className="ebusiness-card__nfc-unsupported">
                  <p>NFC non disponible sur cet appareil</p>
                  <button onClick={handleDownloadVCard} className="ebusiness-card__vcard-button">
                    Télécharger la carte de contact (vCard)
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="ebusiness-card__footer">
            <p className="ebusiness-card__footer-text">
              Connecté au système <strong>MyDigiSelf</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EBusinessCard

