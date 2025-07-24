'use client';

import { useState } from 'react';
import FileUploadForm from './components/FileUploadForm';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalysisResponse = (response: any) => {
    setAnalysisResult(response);
  };

  

  const isSummaryQuestion = (question: string | null): boolean => {
    if (!question) return false;
    const lowerCaseQuestion = question.toLowerCase().trim();
    const summaryKeywords = [
      'write short', 'qısa izah et', 'xülasə et', 'summarize', 
      'main topic', 'əsas mövzu', 'nədən söhbət gedir', 'şərh etsin', 'analiz et',
      'what is this document about', 'explain briefly', 'what is the purpose',
      'tell me about this document', 'document summary', 'give me a summary',
      'bu sənəd nə haqqındadır', 'qısa məlumat ver', 'sənədin məzmunu'
    ];
    return summaryKeywords.some(keyword => lowerCaseQuestion.includes(keyword));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          AION-File Sənəd Analiziii
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sənədi yükləyin və suallarınızı verin. Süni intellekt sənədi analiz edib sizə cavab verəcək.
        </p>

        <FileUploadForm onResponse={handleAnalysisResponse} />

        {analysisResult && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Analiz Nəticəsi:</h2>
            {analysisResult.status === 'success' ? (
              <>
                <p className="text-green-600 font-medium mb-2">{analysisResult.message}</p>
                
                {analysisResult.document_info && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Sənəd Məlumatı:</h3>
                    <p><strong>Fayl Adı:</strong> {analysisResult.document_info.filename}</p>
                    <p><strong>Söz Sayı:</strong> {analysisResult.document_info.word_count}</p>
                    <p><strong>Simvol Sayı:</strong> {analysisResult.document_info.character_count}</p>
                    <p><strong>Analiz Vaxtı:</strong> {analysisResult.document_info.analysis_time}</p>
                    {analysisResult.document_info.estimated_reading_time && (
                      <p><strong>Təxmini Oxunma Vaxtı:</strong> {analysisResult.document_info.estimated_reading_time} dəqiqə</p>
                    )}
                    {analysisResult.document_info.headings && analysisResult.document_info.headings.length > 0 && (
                      <p><strong>Başlıqlar:</strong> {analysisResult.document_info.headings.join(', ')}</p>
                    )}
                  </div>
                )}

                {analysisResult.ai_insights && (
                  <div className="mb-4 p-4 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">AI Görüşləri:</h3>
                    {analysisResult.ai_insights.document_purpose && (
                      <p><strong>Sənədin Məqsədi:</strong> {analysisResult.ai_insights.document_purpose}</p>
                    )}
                    {analysisResult.ai_insights.target_audience && (
                      <p><strong>Hədəf Auditoriya:</strong> {analysisResult.ai_insights.target_audience}</p>
                    )}
                    {analysisResult.ai_insights.summary && (
                      <div className="mt-2">
                        <p className="font-semibold">Xülasə:</p>
                        <p className="whitespace-pre-wrap">{analysisResult.ai_insights.summary}</p>
                      </div>
                    )}
                    {analysisResult.ai_insights.key_insights && analysisResult.ai_insights.key_insights.length > 0 && (
                      <div className="mt-2">
                        <p className="font-semibold">Əsas Fikirlər:</p>
                        <ul className="list-disc list-inside">
                          {analysisResult.ai_insights.key_insights.map((point: string, index: number) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {analysisResult.Youtube && (
                  <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Sual-Cavab:</h3>
                    <p><strong>Sualınız:</strong> {analysisResult.Youtube.question}</p>
                    <p>
                      <strong>Cavab:</strong> 
                      {isSummaryQuestion(analysisResult.Youtube.question) && analysisResult.ai_insights?.summary
                        ? analysisResult.ai_insights.summary
                        : analysisResult.Youtube.answer}
                    </p>
                    {isSummaryQuestion(analysisResult.Youtube.question) === false && analysisResult.Youtube.confidence !== undefined && (
                      <p><strong>Etibarlılıq:</strong> {(analysisResult.Youtube.confidence * 100).toFixed(2)}%</p>
                    )}
                    {isSummaryQuestion(analysisResult.Youtube.question) === false && analysisResult.Youtube.reasoning && (
                      <p className="text-sm text-gray-600 mt-1">
                        {analysisResult.Youtube.reasoning}
                      </p>
                    )}
                  </div>
                )}

                {analysisResult.content_analysis && (
                  <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Məzmun Analizi:</h3>
                    {analysisResult.content_analysis.topics && (
                      <>
                        <p><strong>Dominant Mövzu:</strong> {analysisResult.content_analysis.topics.dominant_topic}</p>
                        {analysisResult.content_analysis.topics.word_frequency && analysisResult.content_analysis.topics.word_frequency.length > 0 && (
                          <p><strong>Ən Çox İşlənən Sözlər:</strong> {analysisResult.content_analysis.topics.word_frequency.map((item: [string, number]) => `${item[0]} (${item[1]})`).join(', ')}</p>
                        )}
                      </>
                    )}
                    {analysisResult.content_analysis.sentiment && (
                      <p><strong>Sentiment:</strong> {analysisResult.content_analysis.sentiment.overall} (Etibarlılıq: {(analysisResult.content_analysis.sentiment.confidence * 100).toFixed(2)}%)</p>
                    )}
                    {analysisResult.content_analysis.readability && (
                      <>
                        <p><strong>Oxunabilirlik (Flesch):</strong> {analysisResult.content_analysis.readability.flesch_reading_ease.toFixed(2)} ({analysisResult.content_analysis.readability.difficulty})</p>
                        <p><strong>Sinif Səviyyəsi:</strong> {analysisResult.content_analysis.readability.grade_level.toFixed(2)}</p>
                      </>
                    )}
                    {analysisResult.content_analysis.key_information && (
                      <>
                        {analysisResult.content_analysis.key_information.entities && analysisResult.content_analysis.key_information.entities.length > 0 && (
                          <p><strong>Əsas Varlıqlar (NER):</strong> {analysisResult.content_analysis.key_information.entities.map((ent: any) => `${ent.text} (${ent.label})`).join(', ')}</p>
                        )}
                        {analysisResult.content_analysis.key_information.dates && analysisResult.content_analysis.key_information.dates.length > 0 && (
                          <p><strong>Tarixlər:</strong> {analysisResult.content_analysis.key_information.dates.join(', ')}</p>
                        )}
                        {analysisResult.content_analysis.key_information.emails && analysisResult.content_analysis.key_information.emails.length > 0 && (
                          <p><strong>E-poçtlar:</strong> {analysisResult.content_analysis.key_information.emails.join(', ')}</p>
                        )}
                        {analysisResult.content_analysis.key_information.urls && analysisResult.content_analysis.key_information.urls.length > 0 && (
                          <p><strong>URL-lər:</strong> {analysisResult.content_analysis.key_information.urls.join(', ')}</p>
                        )}
                        {analysisResult.content_analysis.key_information.phone_numbers && analysisResult.content_analysis.key_information.phone_numbers.length > 0 && (
                          <p><strong>Telefon Nömrələri:</strong> {analysisResult.content_analysis.key_information.phone_numbers.join(', ')}</p>
                        )}
                      </>
                    )}
                  </div>
                )}

                {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Tövsiyələr:</h3>
                    <ul className="list-disc list-inside">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.metadata && (
                  <div className="mb-4 p-4 bg-gray-200 rounded-lg text-sm text-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Metadata:</h3>
                    <p><strong>Analiz Vaxtı:</strong> {new Date(analysisResult.metadata.analysis_timestamp).toLocaleString()}</p>
                    {analysisResult.metadata.model_versions && (
                      <p><strong>Model Versiyaları:</strong> {Object.entries(analysisResult.metadata.model_versions).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
                    )}
                  </div>
                )}

                {analysisResult.analyzed_text && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Çıxarılan Mətn (Tam):</h3>
                    <div className="bg-white p-4 rounded-md border border-gray-300 text-gray-800 text-sm whitespace-pre-wrap">
                      {analysisResult.analyzed_text}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-red-500 font-medium">{analysisResult.message}</p>
            )}
            {analysisResult.error && (
              <p className="text-red-500 text-sm mt-2">Daha ətraflı xəta: {analysisResult.error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}