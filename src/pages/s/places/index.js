import PlaceGrid from "../../../components/PlaceGrid/";
import placeService from "../../../services/place.service";

const Index = ({ searchResults }) => {

    return (
        <main>
            <PlaceGrid places={searchResults} />
        </main>
    )
}

export default (Index);

export async function getServerSideProps(context) {
    const searchQuery = context.query["s"];
    const searchResults = await placeService.searchPlaces(searchQuery);

    return {
        props: {
            searchResults,
        },
    };
}