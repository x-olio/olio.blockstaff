namespace Game.Common
{

    export function Random(min: number, max: number)
    {
        var c = max - min + 1;
        return Math.floor(Math.random() * c + min);
    }
}