import getSportsAll from "../../actions/sports/sports";

//testing: obteniendo todos los nombres
export default async function getSports(ctx) {
    ctx.body = await getSportsAll()
    return ctx
}
