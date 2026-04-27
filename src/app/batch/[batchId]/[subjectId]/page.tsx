import { notFound } from 'next/navigation'
import { getBatchById } from '@/lib/data'
import LecturesClient from './LecturesClient'

export const dynamic = 'force-dynamic'

interface Props {
  params: { batchId: string; subjectId: string }
}

export default function SubjectPage({ params }: Props) {
  const batch = getBatchById(params.batchId)
  if (!batch) notFound()

  const subjectId = decodeURIComponent(params.subjectId)
  const subject = batch.subjects.find(s => s.id === subjectId)
  if (!subject) notFound()

  return (
    <LecturesClient
      batch={{ id: batch.id, name: batch.name, theme: batch.theme }}
      subject={{ id: subject.id, name: subject.name, icon: subject.icon, classCount: subject.classCount }}
      lectures={subject.classes}
    />
  )
}
