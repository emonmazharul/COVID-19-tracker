function htmlText(headline, options) {
  const modifyOptions = options.map((item) => {
    return `<li>${item.value}- ${item.totalVotes} votes</li>`;
  });
  const result = modifyOptions.join("");
  return `
	<div>
		<h3>Your vote subject : ${headline}</h3>
		<p>Here your final result.</p>
		<ol type="1">
			${result}
		</ol>
		<p>
			We are very happy for succesfully manage your vote.
			Thank you again for using and trusting our site.
		</p>
		<a href="/votes.com">vote.com</a>
	</div>
	`;
}

module.exports = htmlText;
