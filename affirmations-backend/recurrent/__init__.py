from recurrent.event_parser import RecurringEvent


def parse(s, now=None):
    return RecurringEvent().parse(s)


def format(r, now=None):
    return RecurringEvent().format(r)
