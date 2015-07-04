# ncIDP

Polypeptide backbone NMR chemical shifts are proven powerful descriptors of local dynamic deviations from the "random coil" state toward canonical types of secondary structure. These digressions, in turn, can be connected to functional or dysfunctional protein states, for example, in adaptive molecular recognition and protein aggregation.  

The **ncIDP tool** makes use of backbone (15)N, (1)H(N), (1)H(α), (13)C(O), (13)C(β), and (13)C(α) chemical shifts derived from a set of 14 intrinsically disordered proteins of unrelated sequence and function. The **ncIDP** prediction accuracy is significantly higher than that obtained with libraries for small peptides or "coil" regions of folded proteins.

## Installation

I strongly recommend selecting a decent cloud-based storage and installing the app on an Nginx-powered server.  

I have personally followed this setup guide, and it worked like a charm: https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx

## Usage

1. Select random coil NMR chemical shift library.
2. Provide a FASTA-formatted protein sequence.
3. Download or send via email the predicted chemical shift table.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

Current release: 1.0a

## Credits

Developed and programmed by Kamil Tamiola (https://www.tamiola.com) and Frans A. A. Mulder (http://nmr.au.dk/).

Based on the doctoral research and *PhD* dissertation of Kamil Tamiola, NMR & Molecular Dynamics Group at University of Groningen, the Netherlands.

If you intend to use, or modify the tool, please cite in your scientific work the following source:

*Tamiola, K., Acar, B. & Mulder, F. A. A. Sequence-specific random coil chemical shifts of intrinsically disordered proteins. J. Am. Chem. Soc. 132, 18000–18003 (2010). http://pubs.acs.org/doi/abs/10.1021/ja105656t*

## License

Copyright (c) 2015 Kamil Tamiola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
