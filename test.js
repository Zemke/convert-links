const convertLinks = require('./convert-links');

const it = (descr, fn) => {
  try {
    fn();
  } catch (e) {
    console.log('\x1b[31m%s\x1b[0m', 'Failure');
    console.log();
    console.error(descr);
    throw e;
  }
};

const expect = expected => ({
  toEqual: (actual, msg) => {
    if (expected !== actual) throw new Error(msg);
  }
});

it('containing nothing more than a link', () => {
    expect(convertLinks("http://www.cwtsite.com"))
        .toEqual('<a href="http://www.cwtsite.com" target="_blank">http://www.cwtsite.com</a>')
});

it('with a link surrounded by strings.', () => {
    expect(convertLinks("The greatest page in the world is http://www.cwtsite.com I swear!"))
        .toEqual('The greatest page in the world is <a href="http://www.cwtsite.com" target="_blank">http://www.cwtsite.com</a> I swear!')
});

it('containing http or www or https.', () => {
    expect(convertLinks("A page called http://cwtsite.com is a nice page."))
        .toEqual('A page called <a href="http://cwtsite.com" target="_blank">http://cwtsite.com</a> is a nice page.',
            'http failed');

    expect(convertLinks("A page called https://cwtsite.com is a nice page."))
        .toEqual('A page called <a href="https://cwtsite.com" target="_blank">https://cwtsite.com</a> is a nice page.',
            'https failed');

    expect(convertLinks("A page called http://www.cwtsite.com is a nice page."))
        .toEqual('A page called <a href="http://www.cwtsite.com" target="_blank">http://www.cwtsite.com</a> is a nice page.',
            'http and www failed');

    expect(convertLinks("A page called https://www.cwtsite.com is a nice page."))
        .toEqual('A page called <a href="https://www.cwtsite.com" target="_blank">https://www.cwtsite.com</a> is a nice page.',
            'https and www failed')
});

it('containing a link with multiple subdomains.', () => {
    expect(convertLinks("A page called http://www.2009.cwtsite.com is a nice page."))
        .toEqual('A page called <a href="http://www.2009.cwtsite.com" target="_blank">http://www.2009.cwtsite.com</a> is a nice page.');
});

it('containing a link as the last part of a sentence.', () => {
    expect(convertLinks("I really like https://cwtsite.com."))
        .toEqual('I really like <a href="https://cwtsite.com" target="_blank">https://cwtsite.com</a>.');
});

it('containing a link preceding a comma.', () => {
    expect(convertLinks("I really like https://cwtsite.com, it's true."))
        .toEqual('I really like <a href="https://cwtsite.com" target="_blank">https://cwtsite.com</a>, it\'s true.');
});

it('containing an email address', () => {
    expect(convertLinks("When I have question, I write to support@cwtsite.com and get answers."))
        .toEqual('When I have question, I write to <a href="mailto:support@cwtsite.com">support@cwtsite.com</a> and get answers.');
});

it('containing an email address and a link', () => {
    expect(convertLinks("Emails at support@cwtsite.com and internet at http://cwtsite.com for much fun."))
        .toEqual('Emails at <a href="mailto:support@cwtsite.com">support@cwtsite.com</a> and internet at <a href="http://cwtsite.com" target="_blank">http://cwtsite.com</a> for much fun.');
});

it('containing a small sub-domain', () => {
    expect(convertLinks('Spend your waiting-for-opponent-time with a bit of One Of Everything https://wl.zemke.io/'))
        .toEqual('Spend your waiting-for-opponent-time with a bit of One Of Everything <a href="https://wl.zemke.io" target="_blank">https://wl.zemke.io</a>/');
    });

console.log('\x1b[32m%s\x1b[0m', 'Success');
