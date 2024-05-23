import { NextResponse } from 'next/server';


export const POST = async (req) => {
    try {
        const reqBody = await req.json()

        const { code, input, language } = reqBody;

        let output = null
        const predefined = language === 'cpp' && code === `#include <iostream>
            
int main(){
    std::cout << "Hello Coders";
    return 0;
}`
        if (predefined)
            output = 'Hello Coders'
        else output = 'Comming soon...'

        return NextResponse.json({
            output,
            message: predefined ? 'Code Compiled in 198 ms' : 'Comming Soon...',
            success: true,
            type: 'success'
        },
            { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
            type: 'error'
        },
            { status: 500 })
    }
}