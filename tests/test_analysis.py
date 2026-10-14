import unittest
from datetime import date, timedelta
from app.analysis import analyze


class DetectorTests(unittest.TestCase):
    def setUp(self):
        self.rows = []
        d = date(1961, 1, 1)
        while d <= date(1993, 12, 31):
            self.rows.append({'date': d.isoformat(), 't': 20, 'p': 2})
            d += timedelta(days=1)
        self.config = {'start': 1991, 'end': 1993, 'hazard': 'heat'}

    def test_year_boundary_and_missing_day(self):
        for r in self.rows:
            if '1991-12-30' <= r['date'] <= '1992-01-02':
                r['t'] = 30
            if '1993-06-01' <= r['date'] <= '1993-06-05':
                r['t'] = 30
            if r['date'] == '1993-06-03':
                r['t'] = None
        a = analyze(self.rows, self.config)
        self.assertEqual(a['totalEvents'], 1)
        self.assertEqual(a['totalDays'], 4)
        self.assertEqual(a['maxDuration'], 4)
        self.assertEqual(a['annual'][0]['events'], 1)
        self.assertEqual(a['annual'][1]['events'], 0)
        self.assertEqual(a['annual'][1]['days'], 2)
        self.assertIsNone(a['change'])

    def test_strict_threshold(self):
        self.assertEqual(analyze(self.rows, self.config)['totalEvents'], 0)

    def test_quality_exclusion(self):
        for r in self.rows:
            if r['date'].startswith('1992'):
                r['t'] = None
        a = analyze(self.rows, self.config)
        self.assertEqual(a['excludedYears'], [1992])
        self.assertIsNone(a['trend']['slope'])

    def test_dry_spell_minimum(self):
        self.config['hazard'] = 'dry'
        for r in self.rows:
            if '1991-01-01' <= r['date'] <= '1991-01-14':
                r['p'] = 0
        a = analyze(self.rows, self.config)
        self.assertEqual(a['totalEvents'], 1)
        self.assertEqual(a['maxDuration'], 14)

    def test_duplicate_last_wins(self):
        self.rows.append({'date': '1991-01-01', 't': None, 'p': 2})
        a = analyze(self.rows, self.config)
        self.assertEqual(a['duplicates'], 1)
        self.assertEqual(a['annual'][0]['observed'], 364)


if __name__ == '__main__':
    unittest.main()
