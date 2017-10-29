#!/usr/bin/perl
use strict;
use warnings;
 
my $datetime = "";
 
sub genRandomNumber {
 	return int (rand(1000)) + 1000;
}

sub genLine {
    my ($linePrefix) = @_;
 	my $rand_IN = genRandomNumber();
    my $rand_OUT = genRandomNumber();

    print "$linePrefix\;$rand_IN\;$rand_OUT\n";
}

sub getFile {
	genLine("lineA");
    genLine("lineB");
}

# while (1) {
#     getFile();
#     sleep 1;
# }

getFile();