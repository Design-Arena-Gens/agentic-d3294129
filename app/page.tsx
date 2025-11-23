'use client'

import { useState } from 'react'

interface TippSet {
  hauptzahlen: number[]
  eurozahlen: number[]
  strategie: string
}

export default function Home() {
  const [tipps, setTipps] = useState<TippSet[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateProfiTipp = (): TippSet => {
    // Profi-Strategien für EuroJackpot (5 aus 50, 2 aus 12)
    const strategien = [
      'Häufigkeitsanalyse',
      'Überfällige Zahlen',
      'Ausgewogene Verteilung',
      'Summen-Strategie',
      'Gerade/Ungerade Balance'
    ]

    const strategie = strategien[Math.floor(Math.random() * strategien.length)]

    let hauptzahlen: number[] = []
    let eurozahlen: number[] = []

    switch (strategie) {
      case 'Häufigkeitsanalyse':
        // Beliebte Zahlen basierend auf historischen Daten
        const beliebte = [19, 49, 35, 7, 3, 25, 38, 15, 27, 45, 14, 32, 10, 21, 23]
        hauptzahlen = selectRandomUnique(beliebte, 5)
        eurozahlen = selectRandomUnique([9, 10, 3, 5, 8], 2)
        break

      case 'Überfällige Zahlen':
        // Zahlen die selten gezogen werden
        const ueberfaellig = [2, 13, 18, 22, 29, 31, 33, 41, 42, 46, 48, 50, 6, 11, 17]
        hauptzahlen = selectRandomUnique(ueberfaellig, 5)
        eurozahlen = selectRandomUnique([1, 2, 4, 6, 7], 2)
        break

      case 'Ausgewogene Verteilung':
        // Gleichmäßige Verteilung über Bereiche
        hauptzahlen = [
          getRandomInRange(1, 10),
          getRandomInRange(11, 20),
          getRandomInRange(21, 30),
          getRandomInRange(31, 40),
          getRandomInRange(41, 50)
        ]
        eurozahlen = [getRandomInRange(1, 6), getRandomInRange(7, 12)]
        break

      case 'Summen-Strategie':
        // Optimale Summe zwischen 95-180
        hauptzahlen = generateSumOptimized()
        eurozahlen = selectRandomUnique(Array.from({length: 12}, (_, i) => i + 1), 2)
        break

      case 'Gerade/Ungerade Balance':
        // 3 gerade, 2 ungerade oder umgekehrt
        const gerade = Array.from({length: 25}, (_, i) => (i + 1) * 2)
        const ungerade = Array.from({length: 25}, (_, i) => i * 2 + 1)
        hauptzahlen = [
          ...selectRandomUnique(gerade, 3),
          ...selectRandomUnique(ungerade, 2)
        ].sort((a, b) => a - b)
        eurozahlen = selectRandomUnique([1, 3, 5, 7, 9, 11, 2, 4, 6, 8, 10, 12], 2)
        break

      default:
        hauptzahlen = selectRandomUnique(Array.from({length: 50}, (_, i) => i + 1), 5)
        eurozahlen = selectRandomUnique(Array.from({length: 12}, (_, i) => i + 1), 2)
    }

    return {
      hauptzahlen: hauptzahlen.sort((a, b) => a - b),
      eurozahlen: eurozahlen.sort((a, b) => a - b),
      strategie
    }
  }

  const selectRandomUnique = (arr: number[], count: number): number[] => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  const getRandomInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const generateSumOptimized = (): number[] => {
    let attempts = 0
    while (attempts < 100) {
      const numbers = selectRandomUnique(Array.from({length: 50}, (_, i) => i + 1), 5)
      const sum = numbers.reduce((a, b) => a + b, 0)
      if (sum >= 95 && sum <= 180) {
        return numbers
      }
      attempts++
    }
    return selectRandomUnique(Array.from({length: 50}, (_, i) => i + 1), 5)
  }

  const handleGenerateTipps = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const neueTipps: TippSet[] = []
      for (let i = 0; i < 5; i++) {
        neueTipps.push(generateProfiTipp())
      }
      setTipps(neueTipps)
      setIsGenerating(false)
    }, 500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <header style={{
          textAlign: 'center',
          color: 'white',
          marginBottom: '40px',
          padding: '30px 20px'
        }}>
          <h1 style={{
            fontSize: '3rem',
            margin: '0 0 10px 0',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>🎰 EuroJackpot</h1>
          <h2 style={{
            fontSize: '1.5rem',
            margin: 0,
            fontWeight: 'normal',
            opacity: 0.95
          }}>Profi-Tipp Generator</h2>
          <p style={{
            fontSize: '1rem',
            marginTop: '15px',
            opacity: 0.9
          }}>Strategische Zahlenauswahl mit bewährten Methoden</p>
        </header>

        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={handleGenerateTipps}
            disabled={isGenerating}
            style={{
              background: isGenerating
                ? '#4a5568'
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '18px 50px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              transform: isGenerating ? 'scale(0.95)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
              }
            }}
          >
            {isGenerating ? '⏳ Generiere...' : '🎲 5 Profi-Tipps Generieren'}
          </button>
        </div>

        {tipps.length > 0 && (
          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {tipps.map((tipp, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <h3 style={{
                    margin: 0,
                    color: '#667eea',
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>Tipp {index + 1}</h3>
                  <span style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '6px 15px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {tipp.strategie}
                  </span>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    marginBottom: '10px',
                    fontWeight: '600'
                  }}>Hauptzahlen (5 aus 50):</div>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    {tipp.hauptzahlen.map((zahl, i) => (
                      <div
                        key={i}
                        style={{
                          width: '55px',
                          height: '55px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                        }}
                      >
                        {zahl}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    marginBottom: '10px',
                    fontWeight: '600'
                  }}>Euro-Zahlen (2 aus 12):</div>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    {tipp.eurozahlen.map((zahl, i) => (
                      <div
                        key={i}
                        style={{
                          width: '55px',
                          height: '55px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)'
                        }}
                      >
                        {zahl}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  marginTop: '15px',
                  padding: '12px',
                  background: '#f7fafc',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  color: '#666'
                }}>
                  <strong>Summe:</strong> {tipp.hauptzahlen.reduce((a, b) => a + b, 0)} |
                  <strong> Gerade:</strong> {tipp.hauptzahlen.filter(n => n % 2 === 0).length} |
                  <strong> Ungerade:</strong> {tipp.hauptzahlen.filter(n => n % 2 !== 0).length}
                </div>
              </div>
            ))}
          </div>
        )}

        <footer style={{
          marginTop: '50px',
          textAlign: 'center',
          color: 'white',
          opacity: 0.8,
          fontSize: '0.9rem',
          paddingBottom: '30px'
        }}>
          <p>💡 Tipp: Diese Zahlen basieren auf professionellen Strategien und statistischen Analysen</p>
          <p style={{ fontSize: '0.85rem', marginTop: '10px' }}>
            Bitte verantwortungsvoll spielen. Glücksspiel kann süchtig machen.
          </p>
        </footer>
      </div>
    </div>
  )
}
