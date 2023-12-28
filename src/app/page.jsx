import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';
import Image from 'next/image';
async function loadData() {
  const { data } = await getClient().query({
    query: gql`
      query {
        characters(page: 1, filter: { name: "rick" }) {
          results {
            id
            name
            image
          }
        }
      }
    `,
  });

  return data.characters.results;
}

async function HomePage() {
  const characters = await loadData();
  return (
    <>
      <h1 className='text-4xl font-bold text-center text-white p-4'>
        Characters
      </h1>
      <div className='flex items-center justify-center'>
        <ul className='grid grid-cols-3'>
          {characters.map((character) => (
            <li
              key={character.id}
              className='flex flex-col items-center justify-center text-white p-2'
            >
              <Image
                src={character.image}
                alt={character.name}
                width={200}
                height={200}
              />
              <p>
                {character.id}. {character.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomePage;
