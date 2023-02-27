import PlaceGrid from "../../../components/PlaceGrid/";
import placeService from "../../../services/place.service";

const Index = ({ searchResults }) => {

    return (
        <main>
            <p className="text-sm font-semibold">{searchResults.length} {searchResults.length>1?("logements"):("logement")}</p>
            <p className="text-xs text-gray-500">Classement des résultats ⓘ</p>
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