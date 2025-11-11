import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './EBusinessCard.css'

function EBusinessCard({ onClose }) {
  const [nfcSupported, setNfcSupported] = useState(false)
  const [nfcActive, setNfcActive] = useState(false)
  const [nfcError, setNfcError] = useState(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const nfcWriterRef = useRef(null)

  // URLs de redirection
  const manifestUrl = window.location.origin + '/manifeste'
  const subscriptionUrl = window.location.origin + '/#pricing'

  useEffect(() => {
    // Détecter le type d'appareil
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
    const isAndroidDevice = /android/i.test(userAgent)
    
    setIsIOS(isIOSDevice)
    setIsAndroid(isAndroidDevice)

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

  const handleAddToGoogleWallet = () => {
    // Pour Google Wallet, nous devons utiliser l'API Google Wallet
    // Cela nécessite normalement un backend pour signer le JWT
    // Pour l'instant, nous créons un objet de données qui peut être utilisé
    
    const walletData = {
      genericObjects: [
        {
          id: `smartbankers.${Date.now()}`,
          classId: 'smartbankers.card',
          genericType: 'GENERIC_TYPE_UNSPECIFIED',
          hexBackgroundColor: '#000000',
          cardTitle: {
            defaultValue: {
              language: 'fr',
              value: 'SmartBankers'
            }
          },
          subheader: {
            defaultValue: {
              language: 'fr',
              value: 'MyDigiSelf SN'
            }
          },
          header: {
            defaultValue: {
              language: 'fr',
              value: 'Rejoignez le mouvement'
            }
          },
          barcode: {
            type: 'QR_CODE',
            value: manifestUrl
          },
          textModulesData: [
            {
              header: 'Manifeste',
              body: manifestUrl,
              id: 'manifeste'
            },
            {
              header: 'Souscription',
              body: subscriptionUrl,
              id: 'subscription'
            }
          ],
          linksModuleData: {
            uris: [
              {
                uri: manifestUrl,
                description: 'Voir le Manifeste',
                id: 'manifeste_link'
              },
              {
                uri: subscriptionUrl,
                description: 'S\'inscrire maintenant',
                id: 'subscription_link'
              }
            ]
          }
        }
      ]
    }

    // Créer un fichier JSON que l'utilisateur peut télécharger
    // Note: Pour une implémentation complète, il faudrait un backend
    // qui génère le JWT signé pour Google Wallet
    const blob = new Blob([JSON.stringify(walletData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'smartbankers-google-wallet.json'
    link.click()
    URL.revokeObjectURL(url)

    // Afficher des instructions
    alert('Pour ajouter cette carte à Google Wallet, vous devez utiliser l\'API Google Wallet avec un backend qui signe le JWT. Contactez votre administrateur pour obtenir le lien d\'ajout direct, ou utilisez un service de génération de passes Google Wallet.')
  }

  const handleAddToAppleWallet = () => {
    // Pour Apple Wallet, nous devons générer un fichier .pkpass
    // Cela nécessite normalement un backend, mais nous allons créer un JSON
    // qui peut être utilisé pour générer le .pkpass
    
    const passData = {
      formatVersion: 1,
      passTypeIdentifier: 'pass.com.mydigiself.smartbankers',
      serialNumber: `smartbankers-${Date.now()}`,
      teamIdentifier: 'TEAM_ID',
      organizationName: 'MyDigiSelf SN',
      description: 'SmartBankers - Carte de visite numérique',
      logoText: 'SmartBankers',
      backgroundColor: 'rgb(0, 0, 0)',
      foregroundColor: 'rgb(255, 255, 255)',
      labelColor: 'rgb(255, 255, 255)',
      generic: {
        primaryFields: [
          {
            key: 'title',
            label: 'SmartBankers',
            value: 'SmartBankers'
          }
        ],
        secondaryFields: [
          {
            key: 'organization',
            label: 'Organisation',
            value: 'MyDigiSelf SN'
          }
        ],
        auxiliaryFields: [
          {
            key: 'manifeste',
            label: 'Manifeste',
            value: 'Voir le Manifeste'
          }
        ],
        backFields: [
          {
            key: 'description',
            label: 'Description',
            value: 'Rejoignez le mouvement pour une IA éthique et transparente'
          },
          {
            key: 'manifeste_url',
            label: 'Manifeste',
            value: manifestUrl
          },
          {
            key: 'subscription_url',
            label: 'Souscription',
            value: subscriptionUrl
          }
        ]
      },
      barcode: {
        message: manifestUrl,
        format: 'PKBarcodeFormatQR',
        messageEncoding: 'iso-8859-1'
      },
      webServiceURL: window.location.origin,
      authenticationToken: 'AUTH_TOKEN',
      associatedStoreIdentifiers: []
    }

    // Créer un fichier JSON que l'utilisateur peut télécharger
    // Note: Pour une implémentation complète, il faudrait un backend
    // qui génère le fichier .pkpass signé
    const blob = new Blob([JSON.stringify(passData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'smartbankers-pass.json'
    link.click()
    URL.revokeObjectURL(url)

    // Afficher des instructions
    alert('Pour ajouter cette carte à Apple Wallet, vous devez convertir le fichier JSON en .pkpass. Contactez votre administrateur pour obtenir le fichier .pkpass signé, ou utilisez un service de génération de passes Apple Wallet.')
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

            <div className="ebusiness-card__divider"></div>

            <div className="ebusiness-card__section">
              <h3 className="ebusiness-card__section-title">Ajouter aux Wallets</h3>
              <p className="ebusiness-card__section-description">
                Ajoutez votre carte SmartBankers à votre portefeuille numérique
              </p>
              <div className="ebusiness-card__wallets">
                {isAndroid && (
                  <button
                    className="ebusiness-card__wallet-button ebusiness-card__wallet-button--google"
                    onClick={handleAddToGoogleWallet}
                  >
                    <svg className="ebusiness-card__wallet-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Ajouter à Google Wallet
                  </button>
                )}
                {isIOS && (
                  <button
                    className="ebusiness-card__wallet-button ebusiness-card__wallet-button--apple"
                    onClick={handleAddToAppleWallet}
                  >
                    <svg className="ebusiness-card__wallet-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.74 1.19 7.16-.28.98-.74 1.95-1.24 2.85zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Ajouter à Apple Wallet
                  </button>
                )}
                {!isIOS && !isAndroid && (
                  <div className="ebusiness-card__wallets-both">
                    <button
                      className="ebusiness-card__wallet-button ebusiness-card__wallet-button--google"
                      onClick={handleAddToGoogleWallet}
                    >
                      <svg className="ebusiness-card__wallet-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Ajouter à Google Wallet
                    </button>
                    <button
                      className="ebusiness-card__wallet-button ebusiness-card__wallet-button--apple"
                      onClick={handleAddToAppleWallet}
                    >
                      <svg className="ebusiness-card__wallet-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.74 1.19 7.16-.28.98-.74 1.95-1.24 2.85zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Ajouter à Apple Wallet
                    </button>
                  </div>
                )}
              </div>
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

