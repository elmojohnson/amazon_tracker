export default function HowTo() {
    return(
        <div className="mt-3">
            <h3>How it works?</h3>
            <ol>
                <li>Go to <span className="link-primary" style={{cursor:"pointer"}} onClick={() => window.open("https://www.amazon.com")}>Amazon's Website</span></li>
                <li>Select an item</li>
                <li>Copy the <b>link</b> in your browser</li>
                <li>Go back to <b>Amazon Price Tracker</b></li>
                <li>Paste the link in the <b>input bar</b> and press <b>Track</b></li>
            </ol>
        </div>
    )  
};
