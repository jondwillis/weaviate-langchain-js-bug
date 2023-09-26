import { insertDocuments } from '@/util/vectorStore'
import Image from 'next/image'
import { Document } from "langchain/document";

async function doWeaviateStuff() {

  const document = new Document({ pageContent: "anything", metadata: {} });

  const docs = [document]
  console.debug("process.env.LONG_TERM_MEMORY_INDEX_NAME",  process.env.LONG_TERM_MEMORY_INDEX_NAME)
  const store = await insertDocuments(docs, "mynamespace", process.env.LONG_TERM_MEMORY_INDEX_NAME)

  const dummy = await store.similaritySearch("anything", 1)
  return dummy
}

export default async function Home() {

  const data = await doWeaviateStuff()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        {JSON.stringify(data)}
      </div>
    </main>
  )
}
