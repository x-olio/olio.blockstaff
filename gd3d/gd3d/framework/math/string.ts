namespace gd3d.math
{
    export function caclStringByteLength(value: string): number
    {
        let total = 0;
        for (let i = 0; i < value.length; i++)
        {
            let charCode = value.charCodeAt(i);
            if (charCode <= 0x007f)
            {
                total += 1;

            } else if (charCode <= 0x07ff)
            {
                total += 2;

            } else if (charCode <= 0xffff)
            {
                total += 3;

            } else
            {
                total += 4;
            }
        }
        return total;
    }
}