const {createClient} = require('@sanity/client')

const client = createClient({
  projectId: 'fy5tiy99',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk9iSlcVkXJdBSUJPeepzSVrrMMOkozwExT1GxuuB1GgzuhDecncH0SyqYlL7hLsfUaIqvovvjQxg4Fdyf1PfQKKRlicejjNxqOQAj5C2d737fKsvaAgrbC72R1iY6MnAgs4PxXccHZG1rhDNudDedTG5i4f6QNOftqiuMWt72MxoEhrRK0o',
  useCdn: false
})

async function deleteAllNewsPosts() {
  console.log('Fetching all newsPost documents...')
  
  const documents = await client.fetch('*[_type == "newsPost"]._id')
  console.log(`Found ${documents.length} documents to delete`)
  
  if (documents.length === 0) {
    console.log('No documents to delete')
    return
  }
  
  // Delete in batches of 100
  for (let i = 0; i < documents.length; i += 100) {
    const batch = documents.slice(i, i + 100)
    const transaction = client.transaction()
    batch.forEach(id => transaction.delete(id))
    await transaction.commit()
    console.log(`Deleted ${Math.min(i + 100, documents.length)} of ${documents.length}`)
  }
  
  console.log('✅ All newsPost documents deleted!')
}

deleteAllNewsPosts().catch(console.error)



