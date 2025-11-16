import { useStudy } from '../context/StudyContext'

export default function ModoEstudio() {
  const { state, setMode } = useStudy()
  const { currentTopic, knowledgeBase } = state

  if (!currentTopic) {
    return <div>No hay tema seleccionado</div>
  }

  const topicData = knowledgeBase[currentTopic]
  const conceptos = topicData?.conceptos || []

  const highlightKeywords = (text) => {
    const keywords = ['arquitectura', 'microservicios', 'API', 'servicio', 'patrón', 'escalabilidad', 'TypeScript', 'AWS', 'Lambda', 'DynamoDB', 'S3', 'Kubernetes']
    let highlightedText = text
    keywords.forEach(keyword => {
      const regex = new RegExp(`(\b${keyword}\b)`, 'gi')
      highlightedText = highlightedText.replace(regex, '<mark class="bg-accent/50 px-1 rounded">$1</mark>')
    })
    return highlightedText
  }

  return (
    <div className="min-h-screen bg-neutral p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Modo Estudio</h1>
          <button onClick={() => setMode('home')} className="btn-coral">
            Volver al inicio
          </button>
        </div>

        <div className="space-y-6">
          {conceptos.map((concepto, index) => (
            <div key={index} className="card card-hover">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-gray-800 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {concepto.titulo}
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightKeywords(concepto.texto) }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Has revisado {conceptos.length} conceptos
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => setMode('cards')} className="btn-secondary">
              Practicar con Tarjetas
            </button>
            <button onClick={() => setMode('quiz')} className="btn-accent">
              Hacer Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
